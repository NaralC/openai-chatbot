import Link from "next/link";
import React, { FC } from "react";

interface MarkdownLiteProps {
  text: string;
}

const MarkdownLite: FC<MarkdownLiteProps> = ({ text }) => {
  const linkRegex = /\[(.+?)\]\((.+?)\)/g; // Is used to check for links
  const parts = [];

  let lastIdx = 0;
  let match;

  // Creating link components
  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, linkText, linkUrl] = match;
    const matchStart = match.index;
    const matchEnd = matchStart + fullMatch.length;

    if (lastIdx < matchStart) {
      parts.push(text.slice(lastIdx, matchStart));
    }

    parts.push(
      <Link
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 break-words undrline underline-offset-2"
        key={linkUrl}
        href={linkUrl}
      >
        {linkText}
      </Link>
    );

    lastIdx = matchEnd;
  }

  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }

  return <>
    {parts.map((part, idx) => (
      <React.Fragment key={idx}>
        {part}
      </React.Fragment>
    ))}  
  </>
};

export default MarkdownLite;
