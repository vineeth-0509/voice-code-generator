// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";

// import FileExplorer from "@/components/FileExplorer";
// import CodeEditor from "@/components/CodeEditor";
// import Preview from "@/components/Preview";
// import AIChat from "@/components/AIChat";

// export default function ProjectPage() {
//   const params = useParams();
//   const projectId = params?.projectId as string;

//   const [files, setFiles] = useState<any[]>([]);
//   const [selectedFile, setSelectedFile] = useState<any>(null);
//   const [loading, setLoading] = useState(false);


//   useEffect(() => {
//     if (!projectId) return;

//     const loadFiles = async () => {
//       try {
//         setLoading(true);

//         const res = await axios.get(
//           `http://localhost:5000/projects/${projectId}`,
//           {
//             headers: {
//               "x-user-id": "user1", 
//             },
//           }
//         );

//         const filesData = res.data.files || [];

//         setFiles(filesData);
//         setSelectedFile(filesData[0] || null);

//       } catch (err) {
//         console.error("Failed to fetch files:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadFiles();
//   }, [projectId]);

 
//   const handleCodeChange = (value: string) => {
//     if (!selectedFile) return;

//     setSelectedFile({
//       ...selectedFile,
//       content: value,
//     });
//   };

//   if (!projectId) {
//     return <div>Loading project...</div>;
//   }

//   return (
//     <div className="flex h-screen">

      
//       <FileExplorer files={files} onSelect={setSelectedFile} />

      
//       <CodeEditor file={selectedFile} onChange={handleCodeChange} />

      
//       <Preview files={files} />

      
//       <AIChat projectId={projectId} refresh={() => {
       
//         if (projectId) {
//           (async () => {
//             try {
//               const res = await axios.get(
//                 `http://localhost:5000/projects/${projectId}`,
//                 {
//                   headers: {
//                     "x-user-id": "user1",
//                   },
//                 }
//               );

//               const filesData = res.data.files || [];
//               setFiles(filesData);
//               setSelectedFile(filesData[0] || null);
//             } catch (err) {
//               console.error("Refresh failed", err);
//             }
//           })();
//         }
//       }} />


//       {loading && (
//         <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded">
//           Loading...
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import FileExplorer from "@/components/FileExplorer";
import CodeEditor from "@/components/CodeEditor";
import Preview from "@/components/Preview";
import AIChat from "@/components/AIChat";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params?.projectId as string;

  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!projectId) return;

    const loadFiles = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/projects/${projectId}`,
          {
            headers: {
              "x-user-id": "user1", 
            },
          }
        );

        const filesData = res.data.files || [];

        setFiles(filesData);
        setSelectedFile(filesData[0] || null);

      } catch (err) {
        console.error("Failed to fetch files:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, [projectId]);

 
  const handleCodeChange = (value: string) => {
    if (!selectedFile) return;

    setSelectedFile({
      ...selectedFile,
      content: value,
    });
  };

  if (!projectId) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="text-slate-400">Loading project...</div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen bg-slate-900 overflow-hidden">
      <FileExplorer files={files} onSelect={setSelectedFile} selectedFile={selectedFile} />
      <CodeEditor file={selectedFile} onChange={handleCodeChange} />
      <Preview files={files} />

      <AIChat projectId={projectId} refresh={() => {
        if (projectId) {
          (async () => {
            try {
              const res = await axios.get(
                `http://localhost:5000/projects/${projectId}`,
                {
                  headers: {
                    "x-user-id": "user1",
                  },
                }
              );

              const filesData = res.data.files || [];
              setFiles(filesData);
              setSelectedFile(filesData[0] || null);
            } catch (err) {
              console.error("Refresh failed", err);
            }
          })();
        }
      }} />

      {loading && (
        <div className="absolute top-4 right-4 bg-blue-600/20 text-blue-300 px-4 py-2 rounded-lg border border-blue-500/30 text-sm font-medium shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            Loading...
          </div>
        </div>
      )}
    </div>
  );
}
