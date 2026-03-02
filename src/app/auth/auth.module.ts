import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SessionStorageService } from "./services/session-storage.service";
import { AuthService } from "./services/auth.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [SessionStorageService, AuthService],
})
export class AuthModule {}
