"use client";
import useChatStore from '@/stores/chatStore';
import { useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function ChatHistory() {
    const chatHistory = useChatStore((state) => state.messages);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 custom-scrollbar">
            {chatHistory.filter(chat => chat.role !== 'system').map((chat, index) => (
                <div key={index} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                    <div className={`${chat.role === 'user' ? 'text-white bg-blue-500 ' : 'bg-zinc-900'} w-auto p-3 rounded-xl max-w-2xl break-words prose`}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{chat.content}</ReactMarkdown>
                    </div>
                </div>
            ))}
        </div>
    );
}