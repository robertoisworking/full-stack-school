import Image from "next/image";
import AttendanceChart from "./AttendanceChart";
import prisma from "@/lib/prisma";

const AttendanceChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date(today);

  lastMonday.setDate(today.getDate() - daysSinceMonday);

  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  // console.log(data)

  const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie"];

  const attendanceMap: { [key: string]: { presente: number; ausente: number } } =
    {
      Lun: { presente: 0, ausente: 0 },
      Mar: { presente: 0, ausente: 0 },
      Mié: { presente: 0, ausente: 0 },
      Jue: { presente: 0, ausente: 0 },
      Vie: { presente: 0, ausente: 0 },
    };

  resData.forEach((item) => {
    const itemDate = new Date(item.date);
    const dayOfWeek = itemDate.getDay();
    
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayName = daysOfWeek[dayOfWeek - 1];

      if (item.present) {
        attendanceMap[dayName].presente += 1;
      } else {
        attendanceMap[dayName].ausente += 1;
      }
    }
  });

  const data = daysOfWeek.map((day) => ({
    name: day,
    presente: attendanceMap[day].presente,
    ausente: attendanceMap[day].ausente,
  }));

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Asistencia</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <AttendanceChart data={data}/>
    </div>
  );
};

export default AttendanceChartContainer;
