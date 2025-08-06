
// import React, { useMemo, lazy, Suspense } from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import NewPage from "./NewPage";
// import Button from "./Button";

// // Lazy load each section
// const SectionOne = lazy(() => import("./SectionOne"));
// const SectionTwo = lazy(() => import("./SectionTwo"));
// const SectionThree = lazy(() => import("./SectionThree"));
// const SectionFour = lazy(() => import("./SectionFour"));

// function App() {
//     // Memoize each section component with lazy loading
//     const MemoizedButton = useMemo(() => <Button />, []);
//     const MemoizedSectionOne = useMemo(() => (
//         <Suspense fallback={<div>Loading Section One...</div>}>
//             <SectionOne />
//         </Suspense>
//     ), []);
    
//     const MemoizedSectionTwo = useMemo(() => (
//         <Suspense fallback={<div>Loading Section Two...</div>}>
//             <SectionTwo />
//         </Suspense>
//     ), []);

//     const MemoizedSectionThree = useMemo(() => (
//         <Suspense fallback={<div>Loading Section Three...</div>}>
//             <SectionThree />
//         </Suspense>
//     ), []);

//     const MemoizedSectionFour = useMemo(() => (
//         <Suspense fallback={<div>Loading Section Four...</div>}>
//             <SectionFour />
//         </Suspense>
//     ), []);

//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" >
//                     <Route index element={
//                         <>
//                             {MemoizedButton}
//                             {MemoizedSectionOne}
//                             {MemoizedSectionTwo}
//                             {MemoizedSectionThree}
//                             {MemoizedSectionFour}
//                         </>
//                     } />
//                     <Route path="new" element={
//                         <>
//                             {MemoizedButton}
//                             <NewPage />
//                         </>
//                     } />
//                 </Route>
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;




import React, { Suspense, lazy } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPage from "./NewPage";
import Button from "./Button";

// Lazy load each section
const SectionOne = lazy(() => import("./SectionOne"));
const SectionTwo = lazy(() => import("./SectionTwo"));
const SectionThree = lazy(() => import("./SectionThree"));
const SectionFour = lazy(() => import("./SectionFour"));

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" >
                    <Route index element={
                        <>
                            <Button />
                            <Suspense fallback={<div>Loading Section One...</div>}>
                                <SectionOne />
                            </Suspense>
                            <Suspense fallback={<div>Loading Section Two...</div>}>
                                <SectionTwo />
                            </Suspense>
                            <Suspense fallback={<div>Loading Section Three...</div>}>
                                <SectionThree />
                            </Suspense>
                            <Suspense fallback={<div>Loading Section Four...</div>}>
                                <SectionFour />
                            </Suspense>
                        </>
                    } />
                    <Route path="new" element={
                        <>
                            <Button />
                            <NewPage />
                        </>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

