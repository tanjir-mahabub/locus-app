/**
 * Permission Checking Type Definition
 */
export type Permission = {
    [key: string]: {
        canAccessAllColumns: boolean;
        canUseSideloading: boolean;
        allowedRegionId?: string | string[] | undefined;
    };
};

/**
 * User Role Permissions
 */
export const permissions: Permission = {
    admin: {
        canAccessAllColumns: true,
        canUseSideloading: true,
        allowedRegionId: []
    },
    normal: {
        canAccessAllColumns: false,
        canUseSideloading: false,
        allowedRegionId: []
    },
    limited: {
        canAccessAllColumns: true,
        canUseSideloading: true,
        allowedRegionId: ['86118093', '86696489', '88186467']
    },
};
