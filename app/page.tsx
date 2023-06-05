"use client";
import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateRoleDto, Mutation } from "../src/generated/graphql";

const roleSchema = z.object({
  name: z.string().min(1).max(255),
  level: z.string().transform((value) => parseInt(value)), // parse string to int before validating
  typeAccess: z.string().min(1).max(255),
  field1: z.string().min(1).max(255), // New field
  field2: z.string().min(1).max(255), // New field
  field3: z.string().min(1).max(255), // New field
  field4: z.string().min(1).max(255), // New field
  field5: z.string().min(1).max(255), // New field
});

const CreateRoleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<any>({
    resolver: zodResolver(roleSchema),
  });

  const [createRole, { loading }] = useMutation<
    Mutation,
    { data: CreateRoleDto }
  >(gql`
    mutation CreateRole($data: CreateRoleDTO!) {
      createRole(CreateRoleDTO: $data) {
        output {
          name
        }
        errors {
          path
          message
          fatal
          code
        }
      }
    }
  `);

  const onSubmit = async (data: CreateRoleDto) => {
    try {
      const response = await createRole({
        variables: {
          data,
        },
      });

      const role = response.data.createRole;

      if (role.errors && role.errors.length > 0) {
        role.errors.forEach((error) => {
          setError(error.path[0] as any, {
            type: "manual",
            message: error.message,
          });
        });
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">
            {errors.name.message as string}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="level"
        >
          Level
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="level"
          {...register("level", { required: "Level is required" })}
        />
        {errors.level && (
          <p className="text-red-500 text-xs italic">
            {errors.level.message as string}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="typeAccess"
        >
          Type Access
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="typeAccess"
          {...register("typeAccess", { required: "Type Access is required" })}
        />
        {errors.typeAccess && (
          <p className="text-red-500 text-xs italic">
            {errors.typeAccess.message as string}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="field1"
        >
          Field 1
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="field1"
          {...register("field1", { required: "Field 1 is required" })}
        />
        {errors.field1 && (
          <p className="text-red-500 text-xs italic">
            {errors.field1.message as string}
          </p>
        )}
      </div>
      {/* Rest of the fields go here... */}

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Role
        </button>
      </div>
    </form>
  );
};

export default CreateRoleForm;
