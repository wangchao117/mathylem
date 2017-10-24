## Symbol definition reference

`symbols.json` is a dictionary whose keys are the symbol names
(i.e. the strings that will get auto-replaced by the symbol in the
editor) and whose values are dictionaries with the following keys:

* `output`: A dictionary with keys `latex`, `text`, and an optional
  `small_latex`.  The values are strings which will comprise the
  LaTeX, ASCII, or small LaTeX (respectively) representations of the
  symbol.  A symbol may have editable components, the ith of which is
  represented by `{$i}` appearing in the string.  For example, the
  LaTeX representation of the `sqrt` symbol is `"\\sqrt{{$1}}"`,
  indicating that it has one editable component, namely the inside of
  the square root.

  * If the ith entry is intended to be an array, with commas rendered
    between elements of the array, then that entry should be
    represented by `{$i{,}}`.  See the `vec` symbol in
    [/sym/extra_symbols.json](https://github.com/ylemkimon/mathylem/blob/master/sym/extra_symbols.json)
    for an example of this.

  * If the ith entry is intended to be a 2D array, with, say, commas
    separating elements of each row and semicolons separating columns,
    then that entry is represented by `{$i{,}{;}}`.  See the `mx`
    symbol in
    [/sym/extra_symbols.json](https://github.com/ylemkimon/mathylem/blob/master/sym/extra_symbols.json)
    for an example of this.

* `type`: A string name for the symbol (will appear in the XML and can
  used for searching).

* `group`: A string group name for the symbol (will be used to group
  symbols in button interface).

* `current`: If this is non-zero, then if the symbol is inserted while
  something is selected, then that selection will become this
  component of the symbol.  For example, if the current state is
  `x+1+2` and you select `x+1` and press `^`, then because the
  exponent symbol has `"current":1`, the selection will become
  component 1 of the exponent (i.e. the base) and you will get
  `(x+1)^{}+2`.

* [optional] `current_type`: If this is `"token"` and current is
  non-zero, then when the symbol is inserted, the first token to the
  left of the cursor when the symbol is inserted will become the
  component specified in `current`.  For example, the exponent symbol
  has `"current":1,"current_type":"token"`, so if the current state of
  the editor is `pi+sin(x)` and the cursor is just after the pi, then
  if `^` is pressed, the state will become `{pi}^{}+sin(x)`.  

* [optional] `attrs`: This is an array of dictionaries describing the
  XML attributes that will be given to each of the symbol's editable
  components.  Each key/value pair in the ith dictionary in this array
  will be set as an attribute name/value pair on the ith editable
  component.  For example, if the `attrs` list has first entry
  `{"small":"yes"}`, then the first component will get a "small"
  attribute with value "yes".  You can include whatever attribute
  names you want, but the following names are treated specially in
  MathYlem if they are present:
  
  * `mode`: This should be set to "text" for any components that
    should be rendered as text (rather than in math mode).  
  
  * `up`: Which component to jump to when the up arrow key is pressed
    (or 0 for the default behaviour).  For example, in a definite
    integral, we want the up arrow key to take us from the integrand
    or the variable of integration directly to the upper limit.  Since
    the upper limit of integration is component 2, we use
    `"up":[2,2,2,2]`.
  
  * `down`: Which component to jump to when the down arrow key is
    pressed (or 0 for the default behaviour).
  
  * `delete`: The index of which component should be used to replace
    the entire symbol if the backspace key is pressed when the cursor
    is at the start of this component.  If 0 or absent, then the
    default backspace behaviour will be used (namely, that it behaves
    like the left arrow when at the start of any component except the
    first, where it deletes the entire symbol).  For example, in an
    exponent such as `x^2`, we want a backspace from just before the 2
    to delete just the exponent, leaving the base.  That is, we want
    component number 1 to be left.  However, if backspace is used in
    the base, we want the default behaviour.  So we use
    `"delete":[0,1]` to get the default behaviour in the first
    component, and deleting the second component to leave us with the
    first only.  

  * `bracket`: If `bracket` is `"yes"`, then this component will be
    surrounded in parentheses if it contains more than one character
    in it.  For example, the first component of an exponent has
    `bracket="yes"`, so will render as `x^{y}` if the first component is
    `x` and the second `y`, but will render as `(x+1)^{y+2}` if the first
    component is `x+1` and the second `y+2`.  
  
  * `small`: If `small` is `"yes"`, then when rendering to LaTeX,
    anything in this component (or any descendant) will be rendered
    using its `small_latex` output mode if available.  For example,
    the exponent symbol has `attrs[1] = {"small":"yes",...}`, so the
    second component (the thing in the exponent) is marked as being
    small.  Thus, for instance, fractions and integrals (to name two)
    that appear inside that exponent will not render at their normal,
    large size.

The following symbol names are treated specially:

* `_raw`: The value under this key should be an array of objects with keys:

  * `group`: The string name of the group

  * `symbols`: An array of objects with keys:

    * `name`: The name of the symbol (the string used to enter it)

    * `latex`: The LaTeX rendering of the symbol
    
    * `text`: The text rendering of the symbol

* `_func`: The value under this key should be an array of objects with keys:

  * `group`: The string name of the group

  * `symbols`: An array of string names of the functions (which will
    take a single argument and whose latex rendering will be
    `\name(<argument>)` and text rendering will be ` name(<argument>) `.  

* `_literal`: The value under this key should be an array of objects with keys:

  * `group`: The string name of the group

  * `symbols`: An array of string names of the functions (which will
    take a single argument and whose latex rendering will be
    `\name` and text rendering will be ` $name `.  
