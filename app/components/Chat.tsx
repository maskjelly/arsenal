"use client";
import { useCompletion } from "ai/react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';

const Chat = () => {
  const { completion, complete, isLoading } = useCompletion({
    api: "/api/completion",
  });

  const [prompt, setPrompt] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Use complete instead of handleSubmit
    await complete(prompt);
    setPrompt("");
  };

  return (
    <>
    <Textarea
      onSubmit={onSubmit}
      placeholder="Type your shit here ..."
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
    />
    <div>
      <ReactMarkdown>{completion}</ReactMarkdown>
    </div>
    <Button type="submit" onClick={onSubmit} disabled={isLoading}>
      {isLoading ? "Thinking..." : "Send"}
    </Button>
  </>
  );
};

export default Chat;
