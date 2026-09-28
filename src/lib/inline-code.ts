/** Only balanced single-backtick spans become code; all other content stays literal. */
export function inlineCodeParts(text: string) {
  return text.split(/((?<!`)`[^`\n]+`(?!`))/g).map((part, index) => index % 2
    ? { code: true, text: part.slice(1, -1) }
    : { code: false, text: part }).filter(part => part.text.length > 0);
}
