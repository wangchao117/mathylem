GuppySymbols = {'symbols': {}};

GuppySymbols.symb_raw = function (symb_name, latex_symb, text_symb, group) {
  return {'output': {'latex': latex_symb,
    'text': text_symb},
  'group': group,
  'char': true,
  'type': symb_name};
};

GuppySymbols.symb_func = function (func_name, group) {
  return {'output': {'latex': '\\' + func_name + '\\left({$1}\\right)',
    'text': ' ' + func_name + '({$1})'},
  'type': func_name,
  'group': group,
  'attrs': [
    {'delete': '1'}
  ]
  };
};

GuppySymbols.symb_func_nonlatex = function (func_name, group) {
  return {'output': {'latex': '\\mathrm{' + func_name + '}\\left({$1}\\right)',
    'text': ' ' + func_name + '({$1})'},
  'type': func_name,
  'group': group,
  'attrs': [
    {'delete': '1'}
  ]
  };
};

GuppySymbols.add_symbols = function (name, sym) {
  var symbols = {};
  if (name == '_raw') {
    for (var i = 0; i < sym.length; i++) {
      for (var t in sym[i]['symbols']) {
        symbols[t] = GuppySymbols.symb_raw(t, sym[i]['symbols'][t]['latex'], sym[i]['symbols'][t]['text'], sym[i]['group']);
      }
    }
  } else if (name == '_literal') {
    for (var j = 0; j < sym.length; j++) {
      for (var i = 0; i < sym[j]['symbols'].length; i++) {
        symbols[sym[j]['symbols'][i]] = GuppySymbols.symb_raw(sym[j]['symbols'][i], '\\' + sym[j]['symbols'][i], ' $' + sym[j]['symbols'][i] + ' ', sym[j]['group']);
      }
    }
  } else if (name == '_func') {
    for (var j = 0; j < sym.length; j++) {
      for (var i = 0; i < sym[j]['symbols'].length; i++) {
        symbols[sym[j]['symbols'][i]] = GuppySymbols.symb_func(sym[j]['symbols'][i], sym[j]['group']);
      }
    }
  } else if (name == '_func_nonlatex') {
    for (var j = 0; j < sym.length; j++) {
      for (var i = 0; i < sym[j]['symbols'].length; i++) {
        symbols[sym[j]['symbols'][i]] = GuppySymbols.symb_func_nonlatex(sym[j]['symbols'][i], sym[j]['group']);
      }
    }
  } else symbols[name] = sym;
  return symbols;
};

module.exports = GuppySymbols;
