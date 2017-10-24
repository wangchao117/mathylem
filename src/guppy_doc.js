require('wicked-good-xpath').install();

var GuppyDoc = function (doc) {
  doc = doc || '<m><e></e></m>';
  this.set_content(doc);
};

GuppyDoc.prototype.is_small = function (nn) {
  var n = nn.parentNode;
  while (n != null && n.nodeName != 'm') {
    if (n.getAttribute('small') == 'yes') { return true }
    n = n.parentNode;
    while (n != null && n.nodeName != 'c') { n = n.parentNode }
  }
  return false;
};

GuppyDoc.prototype.ensure_text_nodes = function () {
  var l = this.base.getElementsByTagName('e');
  for (var i = 0; i < l.length; i++) {
    if (!(l[i].firstChild)) { l[i].appendChild(this.base.createTextNode('')) }
  }
};

GuppyDoc.prototype.is_blank = function () {
  if (this.base.getElementsByTagName('f').length > 0) { return false }
  var l = this.base.getElementsByTagName('e');
  if (l.length == 1 && (!(l[0].firstChild) || l[0].firstChild.textContent == '')) { return true }
  return false;
};

GuppyDoc.prototype.root = function () {
  return this.base.documentElement;
};

GuppyDoc.prototype.get_content = function (t, r) {
  if (t != 'xml') { return this.manual_render(t, this.root(), r) } else { return (new XMLSerializer()).serializeToString(this.base) }
};

GuppyDoc.prototype.xpath_node = function (xpath, node) {
  node = node || this.root();
  return this.base.evaluate(xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
};

GuppyDoc.prototype.xpath_list = function (xpath, node) {
  node = node || this.root();
  return this.base.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
};

GuppyDoc.prototype.set_content = function (xml_data) {
  this.base = (new window.DOMParser()).parseFromString(xml_data, 'text/xml');
  this.ensure_text_nodes();
};

GuppyDoc.bracket_xpath = "(count(./*) != 1 and not \
                  ( \
                            count(./e)=2 and \
                count(./f)=1 and \
                count(./e[string-length(text())=0])=2 and \
                ( \
                  (\
                                count(./f/c)=1 and\
                    count(./f/c[@is_bracket='yes'])=1\
                  )\
                  or\
                  (\
                    f/@c='yes' and \
                count(./e[@current='yes'])=0 and \
                count(./e[@temp='yes'])=0 \
                  )\
                )\
              )\
            )  \
            or\
                (\
              count(./*) = 1 and \
              string-length(./e/text()) != 1 and \
              number(./e/text()) != ./e/text() \
            ) \
            or \
                ( \
              count(./*) = 1 and \
              ./e/@current = 'yes' \
            ) \
            or \
                ( \
              count(./*) = 1 and \
              ./e/@temp = 'yes' \
            )";

GuppyDoc.prototype.manual_render = function (t, n, r) {
  var ans = '';
  if (n.nodeName == 'e') {
    if (t == 'latex' && r) {
      ans = n.getAttribute('render');
    } else if (t == 'text') {
      ans = GuppyUtils.get_value(n);
      if (n.previousSibling && n.nextSibling && ans == '') { ans = ' * ' } else {
        ans = ans.replace(/(.)([^a-zA-Z0-9.])(.)/g, '$1 $2 $3');
        ans = ans.replace(/([a-zA-Z])(?=\.)/g, '$1 * ');
        ans = ans.replace(/(\.)(?=[a-zA-Z])/g, '$1 * ');
        ans = ans.replace(/([a-zA-Z])(?=[a-zA-Z0-9])/g, '$1 * ');
        ans = ans.replace(/([a-zA-Z0-9])(?=[a-zA-Z])/g, '$1 * ');
        if (n.previousSibling && n.previousSibling.getAttribute('group') != 'operations') { ans = ans.replace(/^([a-zA-Z0-9])/g, ' * $1') }
        if (n.nextSibling && n.nextSibling.getAttribute('group') != 'operations') { ans = ans.replace(/([a-zA-Z0-9])$/g, '$1 * ') }
        ans = ' ' + ans + ' ';
      }
    } else {
      ans = GuppyUtils.get_value(n);
    }
  } else if (n.nodeName == 'f') {
    var real_type = (t == 'latex' && this.is_small(n)) ? 'small_latex' : t;
    var nn = this.xpath_node("./b[@p='" + real_type + "']", n) || this.xpath_node("./b[@p='" + t + "']", n);
    if (nn) { ans = this.manual_render(t, nn, r) }
  } else if (n.nodeName == 'b') {
    var cs = [];
    var i = 1;
    var par = n.parentNode;
    for (var nn = par.firstChild; nn != null; nn = nn.nextSibling) {
      if (nn.nodeName == 'c' || nn.nodeName == 'l') { cs[i++] = this.manual_render(t, nn, r) }
    }
    for (var nn = n.firstChild; nn != null; nn = nn.nextSibling) {
      if (nn.nodeType == 3) { ans += nn.textContent } else if (nn.nodeType == 1) {
        if (nn.hasAttribute('d')) {
          var dim = parseInt(nn.getAttribute('d'));
          var joiner = function (d, l) {
            if (d > 1) {
              for (var k = 0; k < l.length; k++) { l[k] = joiner(d - 1, l[k]) }
            }
            return l.join(nn.getAttribute('sep' + (d - 1)));
          };
          ans += joiner(dim, cs[parseInt(nn.getAttribute('ref'))]);
        } else { ans += cs[parseInt(nn.getAttribute('ref'))] }
      }
    }
  } else if (n.nodeName == 'l') {
    ans = [];
    var i = 0;
    for (var nn = n.firstChild; nn != null; nn = nn.nextSibling) {
      ans[i++] = this.manual_render(t, nn, r);
    }
  } else if (n.nodeName == 'c' || n.nodeName == 'm') {
    for (var nn = n.firstChild; nn != null; nn = nn.nextSibling) { ans += this.manual_render(t, nn, r) }
    if (t == 'latex' &&
                n.getAttribute('bracket') == 'yes' &&
                this.base.evaluate(GuppyDoc.bracket_xpath, n, null,
                  XPathResult.BOOLEAN_TYPE, null).booleanValue) {
      ans = '\\left(' + ans + '\\right)';
    }
  }
  return ans;
};

GuppyDoc.prototype.path_to = function (n) {
  var name = n.nodeName;
  if (name == 'm') { return 'guppy_loc_m' }
  var ns = 0;
  for (var nn = n; nn != null; nn = nn.previousSibling) {
    if (nn.nodeType == 1 && nn.nodeName == name) { ns++ }
  }
  return this.path_to(n.parentNode) + '_' + name + '' + ns;
};

module.exports = GuppyDoc;
