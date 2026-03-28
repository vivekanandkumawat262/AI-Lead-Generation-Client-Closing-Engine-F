from fastapi import Depends, HTTPException
from app.dependencies.auth import get_current_user
from app.core.roles import Role

def require_role(allowed_roles: list[Role]):
    def role_checker(current_user = Depends(get_current_user)):
        if current_user.role not in [r.value for r in allowed_roles]:
            raise HTTPException(status_code=403, detail="Access denied")
        return current_user

    return role_checker

 