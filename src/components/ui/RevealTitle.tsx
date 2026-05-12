"use client";

import { motion } from "framer-motion";
import React from "react";

const containerVariants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { staggerChildren: 0.055, delayChildren: delay },
  }),
};

const wordVariants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type Token =
  | { type: "word"; text: string; isHighlight: boolean }
  | { type: "newline" };

function buildTokens(text: string, highlightWord?: string): Token[] {
  const tokens: Token[] = [];

  type Segment = { content: string; isHighlight: boolean };
  let segments: Segment[];

  if (highlightWord) {
    const escaped = highlightWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    segments = text.split(regex).map((s) => ({
      content: s,
      isHighlight: s.toLowerCase() === highlightWord.toLowerCase(),
    }));
  } else {
    segments = [{ content: text, isHighlight: false }];
  }

  segments.forEach(({ content, isHighlight }) => {
    const lines = content.split("\n");
    lines.forEach((line, li) => {
      if (li > 0) tokens.push({ type: "newline" });
      line.split(" ").filter(Boolean).forEach((word) => {
        tokens.push({ type: "word", text: word, isHighlight });
      });
    });
  });

  return tokens;
}

interface RevealTitleProps {
  text: string;
  highlightWord?: string;
  as?: "h1" | "h2";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export function RevealTitle({
  text,
  highlightWord,
  as: Tag = "h2",
  className,
  style,
  delay = 0,
}: RevealTitleProps) {
  const tokens = buildTokens(text, highlightWord);

  return (
    <Tag className={className} style={style}>
      <motion.span
        className="inline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        custom={delay}
        viewport={{ once: true, margin: "-80px" }}
      >
        {tokens.map((token, i) => {
          if (token.type === "newline") return <br key={`br-${i}`} />;

          const nextToken = tokens[i + 1];
          const addSpace = nextToken?.type === "word";

          return (
            <React.Fragment key={i}>
              <span
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "bottom",
                  paddingBottom: "0.12em",
                  marginBottom: "-0.12em",
                }}
              >
                <motion.span
                  variants={wordVariants}
                  style={{
                    display: "inline-block",
                    ...(token.isHighlight
                      ? {
                          backgroundImage:
                            "linear-gradient(162.47deg, #FFB692 0%, #FF7E33 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : {}),
                  }}
                >
                  {token.text}
                </motion.span>
              </span>
              {addSpace && " "}
            </React.Fragment>
          );
        })}
      </motion.span>
    </Tag>
  );
}
