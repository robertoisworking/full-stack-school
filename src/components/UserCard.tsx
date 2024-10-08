import prisma from "@/lib/prisma";
import Image from "next/image";

const roleTranslations: Record<string, string> = {
  admin: "admin",
  teacher: "docente",
  student: "estudiante",
  parent: "familias",
};

const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {

  const modelMap: Record<string, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const model = modelMap[type];
  if (!model) {
    throw new Error(`No se encontró un modelo para el tipo ${type}`);
  }

  const data = await model.count();

  const translatedType = roleTranslations[type];

  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">
        {translatedType}s
      </h2>
    </div>
  );
};

export default UserCard;
