# Elements of _a_ in _b_ - Find matching strings in two columns using regex

This is a small JavaScript tool to solve a very specific problem: Imagine you have two columns of data, and potentially duplicate substrings that may exist in both columns. How do you quickly identify which of the elements (substrings) of _column A_ are also included in _column B_?

Although this might seem like a fairly niche problem, it actually comes up all the time in various forms. Generally, the solution involves writing a quick throwaway script in Ruby, Python, Perl, or some other scripting language. Depending on the nature of the data, it may also be solvable with clever piping of command-line tools like `sed`, `sort`, and `uniq`.

Nevertheless, being able to quickly find matching subsets of data without needing to write a custom script each time can be a great time-saver for situations where this kind of thing comes up frequently.

## Supported features

* Live search (results update as you type)
* Works offline (just clone or download this repository and open `index.html` in any browser)
* [Online demo](https://dohliam.github.io/tiny_tools/elements/) available
* Group capturing using parentheses
* Display total number of matches found

## Usage

Enter some data in box **a** and box **b**. By default, values will appear in the **result** box as you type if there are sequences of numerals (`/\d\d+/`) that appear anywhere in both box _a_ and box _b_.

For example, if you input the following into box _a_:

    foo foo 54 bar bar
    bar bar 96 foo foo
    foo foo 21 bar bar

And the following into box _b_:

    234
    abc
    96
    foo bar

The result will show as `96`, because this sequence of numerals occurs in both column _a_ and column _b_.

The sequence matched in both columns is easily configurable, and does _not_ have to be the same. The examples below demonstrate the flexibility possible using capture groups, character classes, metacharacters and other regex features.

### Grouping

Use rounded brackets `()` to isolate capture groups. Characters outside of the capture group will be ignored.

This can be useful for data that is separated by regular delimiters, for example tabs, commas or other characters.

For example, input the following into column _a_:

    abc@def#ghi
    jkl@mno#pqr
    stu@vwx#yza

And the following in column _b_:

    abc
    def
    ghi
    jkl
    mno
    pqr
    stu
    vwx
    yza

For **Regex _a_** enter:

    #([a-z]+)

And for **Regex _b_** enter:

    [a-z]+

This gives the result:

    ghi
    pqr
    yza

This is possible because the regular expression `/#([a-z]+)/` matched the strings of letters (`/[a-z]+/`) following a hash/pound/number symbol (`/#/`) in column _a_, but only _captured_ the group of letters in each line (without the `#` symbol) for the purposes of matching with the data in column _b_.

When capturing groups, anything outside of the parentheses is ignored. If _Regex a_ had been `@([a-z]+)` instead (try it!), the result would be:

    def
    mno
    vwx

This is because the regular expression `/@([a-z]+)/` matches the "middle column" of data in box _a_, and matches it against the text in box _b_.

To match any sequence of characters in column _b_ (not just letters), use `.*` instead of `[a-z]+`.

If the data in either column has been separated by tabs, the metacharacter `\t` can be used to match it.

For example, given the following data in column _a_:

    abc	123	def
    ghi	456	jkl
    mno	789	pqr
    stu	101	vwx

And the following data in column _b_:

    980
    765
    432
    123
    987
    765

Enter `\t(.*)\t` for _Regex a_, and `.*` for _Regex b_.

The result will be `123`, because only sequences surrounded by tabs were matched in column _a_.

Note: An easier way to approach the above example in particular might be to simply use `\d+` for _Regex a_, which will match all sequences of digits (which in this case happen to only occur in the middle column).

## See also

"Elements of _a_ in _b_" is part of the [**tiny tools**](https://dohliam.github.io/tiny_tools/) series.

Other tools for working with columns of data that might also be of interest:

* [Sum columns](https://github.com/dohliam/sum-columns)
* [Compare columns](https://github.com/dohliam/compare-columns)
* [Sort columns](https://github.com/dohliam/sort-columns)

## License

MIT.

[milligram](https://github.com/milligram/milligram) CSS by @cjpatoilo, prototyped using [dropin-minimal-css](https://github.com/dohliam/dropin-minimal-css)
