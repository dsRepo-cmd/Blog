import { UserRole } from "@/entities/User";
import { rtkApi } from "@/shared/api/rtkApi";

interface UpdateUserRolesOptions {
  userId: string;
  roles: UserRole[];
}

const userRoleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateRole: build.mutation<void, UpdateUserRolesOptions>({
      query: ({ userId, roles }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: {
          roles,
        },
      }),
    }),
  }),
});

export const updateUserRolesMutation =
  userRoleApi.endpoints.updateRole.initiate;
