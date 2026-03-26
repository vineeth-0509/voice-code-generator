// 'use client';
// export default function FileExplorer({files, onSelect}: any) {
//     return(
//         <div className='w-1/5 bg-gray-900 text-white p-2'>
//             {files.map((file: any)=>(
//                 <div
//                 key={file.id}
//                 className='cursor-pointer p-1 hover:bg-gray-700'
//                 onClick={()=> onSelect(file)}
//                 >
//                 {file.name}
//                 </div>
//             ))}

//         </div>
//     )
// }

'use client';
import { FileCode2, Folder } from "lucide-react";
import { useState } from "react";

export default function FileExplorer({files, onSelect, selectedFile}: any) {
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    const toggleFolder = (folderId: string) => {
        const newExpanded = new Set(expandedFolders);
        if (newExpanded.has(folderId)) {
            newExpanded.delete(folderId);
        } else {
            newExpanded.add(folderId);
        }
        setExpandedFolders(newExpanded);
    }

    const getFileIcon = (name: string) => {
        if (name.endsWith('.tsx') || name.endsWith('.ts')) return 'text-blue-400';
        if (name.endsWith('.jsx') || name.endsWith('.js')) return 'text-yellow-400';
        if (name.endsWith('.css')) return 'text-purple-400';
        if (name.endsWith('.json')) return 'text-orange-400';
        return 'text-slate-400';
    }

    return(
        <div className='w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 border-r border-slate-700/50 overflow-y-auto flex flex-col shadow-lg'>
            <div className="px-4 py-4 border-b border-slate-700/50 sticky top-0 bg-slate-900/95 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <Folder size={16} className="text-slate-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Files</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {files && files.length > 0 ? (
                    <div className="p-2">
                        {files.map((file: any) => (
                            <div
                                key={file.id}
                                className={`
                                    group relative px-3 py-2 cursor-pointer rounded-md mb-1 transition-all duration-150
                                    ${selectedFile?.id === file.id 
                                        ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 shadow-md' 
                                        : 'hover:bg-slate-700/50 text-slate-300'
                                    }
                                    flex items-center gap-2
                                `}
                                onClick={() => onSelect(file)}
                            >
                                <FileCode2 
                                    size={16} 
                                    className={`flex-shrink-0 ${getFileIcon(file.name)}`} 
                                />
                                <span className="text-sm font-medium truncate flex-1">
                                    {file.name}
                                </span>
                                {selectedFile?.id === file.id && (
                                    <div className="w-1 h-4 bg-blue-400 rounded-full flex-shrink-0"></div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-32 text-slate-500">
                        <div className="text-center">
                            <Folder size={32} className="mx-auto mb-2 opacity-50" />
                            <p className="text-xs">No files</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-3 border-t border-slate-700/50 bg-slate-900/50 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>{files?.length || 0} file{files?.length !== 1 ? 's' : ''}</span>
                </div>
            </div>
        </div>
    )
}
