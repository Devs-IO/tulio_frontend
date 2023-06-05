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
});

const CreateRoleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateRoleDto>({
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

  // isso vai estar na api/graphql - instala a extensão apollo
  // ao criar o arquivo apollo.config.js, vc busca no back

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

      // Process response if needed
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p>{errors.name.message as string}</p>}
      </div>
      <div>
        <label htmlFor="level">Level</label>
        <input
          type="number"
          id="level"
          {...register("level", { required: "Level is required" })}
        />
        {errors.level && <p>{errors.level.message as string}</p>}
      </div>
      <div>
        <label htmlFor="typeAccess">Type Access</label>
        <input
          type="text"
          id="typeAccess"
          {...register("typeAccess", { required: "Type Access is required" })}
        />
        {errors.typeAccess && <p>{errors.typeAccess.message as string}</p>}
      </div>
      <button type="submit" disabled={loading}>
        Create Role
      </button>
    </form>
  );
};

export default CreateRoleForm;
