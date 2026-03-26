// 'use client'
// import { Editor } from "@monaco-editor/react";



// export default function CodeEditor({file, onChange}: any){
//     return(
//         <div className="w-2/5">
//             <Editor
//             height='90vh'
//             defaultLanguage="typescript"
//             value={file?.content}
//             onChange={(value) => onChange(value)}
//             />

//         </div>
//     )
// }

'use client'
import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";

export default function CodeEditor({file, onChange}: any){
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center border-l border-r border-slate-700/50">
                <div className="text-slate-400 text-sm">Loading editor...</div>
            </div>
        )
    }

    return(
        <div className="flex-1 border-l border-r border-slate-700/50 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-sm font-medium text-slate-300">
                        {file?.name || 'No file selected'}
                    </span>
                </div>
                <div className="text-xs text-slate-500">
                    {file?.language?.toUpperCase() || 'TypeScript'}
                </div>
            </div>
            <Editor
                height='calc(100vh - 80px)'
                language={file?.language || "typescript"}
                value={file?.content || ''}
                onChange={(value) => onChange(value)}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    fontFamily: 'Fira Code, Monaco, Courier New, monospace',
                    lineHeight: 1.6,
                    padding: { top: 16, bottom: 16 },
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    formatOnPaste: true,
                    formatOnType: true,
                    autoClosingBrackets: 'always',
                    autoClosingQuotes: 'always',
                    autoIndent: 'keep',
                    smoothScrolling: true,
                    cursorSmoothCaretAnimation: 'on',
                    renderLineHighlight: 'gutter',
                    tabSize: 2,
                    insertSpaces: true,
                    trimAutoWhitespace: true,
                    bracketPairColorization: {
                        enabled: true,
                    },
                    'bracketPairColorization.independentColorPoolPerBracketType': true,
                } as any}
                loading={<div className="text-slate-400">Loading Monaco Editor...</div>}
            />
        </div>
    )
}
