import { RouterModule } from "@nestjs/core";
import { AuthModule } from "src/auth/auth.module";
import { ProgModule } from "src/prog/program.module";

export const routesConfig = RouterModule.register([
    { path: 'auth', module: AuthModule },
    { path: 'program', module: ProgModule },
])