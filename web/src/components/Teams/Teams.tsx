import { Button, buttonVariants } from "../ui/button";
import React from 'react';
import { cn } from '@/lib/utils';

const Teams: React.FC = () => {

    const linkedClassNames = buttonVariants({ variant: "default", size: 'lg' });
    const notLinkedClassNames = buttonVariants({ variant: "outline", size: 'lg' });

    return (
        <div className="p-6 border rounded-lg">
            <div className="grid grid-cols-12 gap-4">
                {/* Vehicle Software */}
                <div className="col-span-12">
                    <span className="font-bold">Vehicle Software</span>
                </div>
                
                {/* Meeting Time */}
                <div className="col-span-3 flex flex-col">
                    <span className="font-bold">Meeting Time</span>
                    <div className="flex items-center mt-2">
                        <div className="w-3/4 h-2 bg-purple-500 rounded-l"></div>
                        <div className="w-1/4 h-2 bg-gray-200 rounded-r"></div>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-500">45 minutes</span>
                        <span>70%</span>
                    </div>
                </div>
                
                {/* Decisions */}
                <div className="col-span-3 flex flex-col">
                    <span className="font-bold">Decisions</span>
                    <div className="inline-flex mt-2 space-x-2">
                        <Button className={cn(linkedClassNames, 'bg-purple-700')}>
                            3 decisions linked
                        </Button>
                        <Button className={cn(notLinkedClassNames, 'bg-blue-500')}>
                            2 decisions not linked
                        </Button>
                    </div>
                </div>
                
                {/* Spacer */}
                <div className="col-span-2"></div>
                
                {/* Maturity */}
                <div className="col-span-4 flex flex-col">
                    <span className="font-bold">Maturity</span>
                    <div className="flex items-center mt-2">
                        <div className="w-2/4 h-2 bg-green-500 rounded-l"></div>
                        <div className="w-2/4 h-2 bg-gray-200 rounded-r"></div>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-500">4 maturity</span>
                        <span>Measured</span>
                    </div>
                </div>
            </div>
        </div>
    );
}



// type TeamsProps = {

// };

// const Teams: React.FC<TeamsProps> = () => {

//     const classNames = buttonVariants({ variant: "default", size: 'lg' });


//     return (
//         <div>
//             <div className="box-border h-200 w-1000 p-4 border-4">
//                 <div className="box-border h-15 w-40 p-4 border-4">
//                     Vehicle Software
//                 </div>
//                 <div className="box-border h-15 w-300 p-4 border-4 inline-block">Meeting Time</div>
//                 <div className="box-border h-15 w-300 p-4 border-4 inline-block">Decisions</div>
//                 <div className="box-border h-15 w-300 p-4 border-4 inline-block">Maturity</div>
//                 <div className="flex mt-4">
//                     <Button className={cn(classNames, 'mr-4')} >
//                         3 decisions linked
//                     </Button>
//                     <Button className={cn(classNames)}>
//                         2 decisions not linked
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }
export default Teams;