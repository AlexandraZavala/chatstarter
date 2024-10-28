"use client";

import { Authenticated, useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
import { api } from "../../convex/_generated/api";
import { SignInButton } from "@clerk/nextjs";
// using convex real time api

export default function Home() {
  const messages = useQuery(api.functions.message.list);
  const createMessage = useMutation(api.functions.message.create);
  const [input, setInput] = useState("");

  //clerk has its own component to determine if someone is signed in or not,
  //however those components dont account for also the need for convex to know if someone is signed in or not
  // so we use convex components
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //prevent the page on refreshing on submit
    event.preventDefault();
    createMessage({ sender: "Alice", content: input });
    setInput("");
  };

  return (
    <>
      <Authenticated>
        <div>
          {messages?.map((message, index) => (
            <div key={index}>
              <strong>{message.sender}</strong>: {message.content}
            </div>
          ))}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="message"
              id="message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </Authenticated>
      <SignInButton />
    </>
  );
}
