// 'use client';

// import { useState } from "react";
// import axios from "axios";

// export default function AIChat({projectId, refresh}: any){
//     const [prompt, setPrompt] = useState("");
//     const sendPrompt = async() => {
//         await axios.post(
//             `http://localhost:5000/projects/${projectId}/update`,
//             {prompt},
//             {
//                 headers:{
//                     "x-user-id":"user1",
//                     "x-user-email":"vineeththungani@gmail.com"
//                 }
//             }
//         );
//         setPrompt("");
//         refresh();
//     }


//     return (
//         <div className="p-2 bg-gray-800 text-white">
//             <input
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             className="text-black p-1"
//             />
//         <button onClick={sendPrompt}>Send</button>
//         </div>
//     )
// }

'use client';

import { useState, useRef } from "react";
import axios from "axios";
import { SendHorizontal, Loader2 } from "lucide-react";

export default function AIChat({projectId, refresh}: any){
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const sendPrompt = async() => {
        if (!prompt.trim()) return;
        
        setIsLoading(true);
        try {
            await axios.post(
                `http://localhost:5000/projects/${projectId}/update`,
                {prompt},
                {
                    headers:{
                        "x-user-id":"user1",
                        "x-user-email":"vineeththungani@gmail.com"
                    }
                }
            );
            setPrompt("");
            refresh();
            inputRef.current?.focus();
        } catch (error) {
            console.error("Failed to send prompt:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendPrompt();
        }
    }

    return (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-800/0 border-t border-slate-700/50 p-4 shadow-2xl">
            <div className="max-w-full mx-auto">
                <div className="flex items-center gap-3">
                    <input
                        ref={inputRef}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask AI to update your code..."
                        className="flex-1 px-4 py-3 bg-slate-700/50 hover:bg-slate-700 focus:bg-slate-600 text-black placeholder-slate-400 rounded-lg border border-slate-600/50 focus:border-blue-500/50 focus:outline-none transition-all duration-200 shadow-sm"
                    />
                    <button 
                        onClick={sendPrompt}
                        disabled={isLoading || !prompt.trim()}
                        className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-lg flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 disabled:shadow-none"
                    >
                        {isLoading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <SendHorizontal size={20} />
                        )}
                        <span className="hidden sm:inline">Send</span>
                    </button>
                </div>
                <p className="text-xs text-slate-400 mt-2 ml-4">Shift + Enter for new line, Enter to send</p>
            </div>
        </div>
    )
}
