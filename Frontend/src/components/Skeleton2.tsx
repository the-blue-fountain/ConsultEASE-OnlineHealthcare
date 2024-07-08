import { Card, CardHeader, CardBody} from "@material-tailwind/react";

export const SkeletonLoader2 = () => {
   return (
    <Card className="h-full w-full mx-2"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <CardHeader floated={false} shadow={false}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[20px] w-[220px] h-12 my-2 font-sans rounded-full bg-gray-300 animate font-bold text-gray-300 animate-pulse">
            </div>
            <div className="w-[380px] h-6 font-sans my-1  bg-gray-300 rounded-full animate animate-pulse">
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="rounded-none shadow-none border-none px-0"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="max-h-[584px] overflow-auto no-scrollbar">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-y border-gray-300 p-3 border-r-[2px] bg-gray-300 animate-pulse" style={{ width: '15%' }}>
                  <div className="font-sans font-bold text-[14px] text-gray-300 leading-none">&nbsp;</div>
                </th>
                <th className="border-y border-gray-300 p-3 border-r-[2px] bg-gray-300 animate-pulse" style={{ width: '10%' }}>
                  <div className="font-sans font-bold text-[14px] text-gray-300 leading-none">&nbsp;</div>
                </th>
                <th className="border-y border-gray-300 p-3 border-r-[2px] bg-gray-300 animate-pulse" style={{ width: '20%' }}>
                  <div className="font-sans font-bold text-[14px] text-gray-300 leading-none">&nbsp;</div>
                </th>
                <th className="border-y border-gray-300 p-3 border-r-[2px] bg-gray-300 animate-pulse" style={{ width: '15%' }}>
                  <div className="font-sans font-bold text-[14px] text-gray-300 leading-none">&nbsp;</div>
                </th>
                <th className="border-y border-gray-300 p-3 border-r-[2px] bg-gray-300 animate-pulse" style={{ width: '22%' }}>
                  <div className="font-sans font-bold text-[14px] text-gray-300 leading-none">&nbsp;</div>
                </th>
                <th className="border-y border-gray-300 p-3 bg-gray-300 animate-pulse" style={{ width: '18%' }}>
                  <div className="font-sans font-bold text-[14px] text-gray-300 leading-none">&nbsp;</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(12)].map((_, index) => (
                <tr key={index}>
                  <td className="p-2 border-b border-gray-300 bg-gray-100 animate-pulse" style={{ width: '20%' }}>
                    <div className="font-sans text-gray-300 text-[15px]">&nbsp;</div>
                  </td>
                  <td className="p-2 border-b border-gray-300 bg-gray-100 animate-pulse" style={{ width: '10%' }}>
                    <div className="font-sans text-gray-300 text-[15px]">&nbsp;</div>
                  </td>
                  <td className="p-2 border-b border-gray-300 bg-gray-100 animate-pulse" style={{ width: '30%' }}>
                    <div className="font-sans text-gray-300 text-[15px]">&nbsp;</div>
                  </td>
                  <td className="p-2 border-b border-gray-300 bg-gray-100 animate-pulse" style={{ width: '15%' }}>
                    <div className="font-sans text-gray-300 text-[15px]">&nbsp;</div>
                  </td>
                  <td className="p-2 border-b border-gray-300 bg-gray-100 animate-pulse" style={{ width: '5%' }}>
                    <div className="font-sans text-gray-300 text-[15px]">&nbsp;</div>
                  </td>
                  <td className="p-2 border-b border-gray-300 bg-gray-100 animate-pulse" style={{ width: '20%' }}>
                    <div className="font-sans text-gray-300 text-[15px]">&nbsp;</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
    

