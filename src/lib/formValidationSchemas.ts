import { z } from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "¡Se requiere el nombre de la materia!" }),
  teachers: z.array(z.string()), // ids de profesores
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "¡Se requiere el nombre de la clase!" }),
  capacity: z.coerce.number().min(1, { message: "¡Se requiere la capacidad!" }),
  gradeId: z.coerce.number().min(1, { message: "¡Se requiere el grado!" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "¡El nombre de usuario debe tener al menos 3 caracteres!" })
    .max(20, { message: "¡El nombre de usuario debe tener como máximo 20 caracteres!" }),
  password: z
    .string()
    .min(8, { message: "¡La contraseña debe tener al menos 8 caracteres!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "¡Se requiere el nombre!" }),
  surname: z.string().min(1, { message: "¡Se requiere el apellido!" }),
  email: z
    .string()
    .email({ message: "¡Email no válido!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "¡Se requiere el tipo de sangre!" }),
  birthday: z.coerce.date({ message: "¡Se requiere la fecha de nacimiento!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "¡Se requiere el sexo!" }),
  subjects: z.array(z.string()).optional(), // subject ids
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "¡El nombre de usuario debe tener al menos 3 caracteres!" })
    .max(20, { message: "¡El nombre de usuario debe tener como máximo 20 caracteres!" }),
  password: z
    .string()
    .min(8, { message: "¡La contraseña debe tener al menos 8 caracteres!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "¡Se requiere el nombre!" }),
  surname: z.string().min(1, { message: "¡Se requiere el apellido!" }),
  email: z
    .string()
    .email({ message: "¡Email no válido!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "¡Se requiere el tipo de sangre!" }),
  birthday: z.coerce.date({ message: "¡Se requiere la fecha de nacimiento!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "¡Se requiere el género!" }),
  gradeId: z.coerce.number().min(1, { message: "¡Se requiere el grado!" }),
  classId: z.coerce.number().min(1, { message: "¡Se requiere la clase!" }),
  parentId: z.string().min(1, { message: "¡Se requiere el ID del padre!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "¡Se requiere el título!" }),
  startTime: z.coerce.date({ message: "¡Se requiere la hora de inicio!" }),
  endTime: z.coerce.date({ message: "¡Se requiere la hora de fin!" }),
  lessonId: z.coerce.number({ message: "¡Se requiere la lección!" }),
});

export type ExamSchema = z.infer<typeof examSchema>;
