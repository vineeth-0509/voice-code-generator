// 'use client'
// import { Sandpack } from "@codesandbox/sandpack-react";

// export default function Preview({files}: any){
//     const sandpackFiles: any = {};
//     files.forEach((f:any) =>{
//         sandpackFiles[f.path] = {
//             code: f.content,
//         };
//     });

//     return(
//         <div className="w-2/5">
//             <Sandpack
//             template='react'
//             files={sandpackFiles}
//             options={{showNavigator: false}}
//             />

//         </div>
//     )
// }

'use client'
import { Sandpack } from "@codesandbox/sandpack-react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Preview({files}: any){
    const [showPreview, setShowPreview] = useState(true);

    const sandpackFiles: any = {};
    files?.forEach((f:any) =>{
        sandpackFiles[f.path] = {
            code: f.content,
        };
    });

    return(
        <div className="w-80 border-l border-slate-700/50 overflow-hidden flex flex-col bg-slate-950 shadow-lg">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm font-medium text-slate-300">Preview</span>
                    </div>
                </div>
                <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="p-1.5 hover:bg-slate-700/50 rounded-md transition-colors duration-150"
                    title={showPreview ? "Hide preview" : "Show preview"}
                >
                    {showPreview ? (
                        <Eye size={16} className="text-slate-400" />
                    ) : (
                        <EyeOff size={16} className="text-slate-500" />
                    )}
                </button>
            </div>

            {showPreview ? (
                <div className="flex-1 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
                    <Sandpack
                        template='react'
                        files={sandpackFiles}
                        options={{
                            showNavigator: false,
                            showTabs: true,
                            showLineNumbers: false,
                            editorHeight: 'auto',
                        }}
                        theme="dark"
                        customSetup={{
                            dependencies: {},
                        }}
                    />
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-slate-500">
                    <div className="text-center">
                        <EyeOff size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-xs">Preview hidden</p>
                    </div>
                </div>
            )}
        </div>
    )
}
