import { RouterModule } from "@nestjs/core";
import { AuthModule } from "src/auth/auth.module";
import { ProgModule } from "src/prog/prog.module";

export const routesConfig = RouterModule.register([
    { path: 'auth', module: AuthModule },
    { path: 'prog', module: ProgModule },
])