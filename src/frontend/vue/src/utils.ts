
export function getNextFocusNode(t: EventTarget) {
  const parent = t.parentNode.nextSibling;
  return parent.getElementsByTagName("input")[0];
}

