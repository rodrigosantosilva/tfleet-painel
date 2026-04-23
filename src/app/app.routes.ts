import { Routes } from '@angular/router';
import { LoginComponent } from './painel/login/login.component';
import { PainelComponent } from './painel/painel/painel.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './painel/home/home.component';
import { AtendimentoComponent } from './painel/atendimento/atendimento.component';
import { ServicosComponent } from './painel/servicos/servicos.component';
import { FrotaComponent } from './painel/frota/frota.component';
import { CustoComponent } from './painel/custo/custo.component';
import { InfracoesComponent } from './painel/infracoes/infracoes.component';
import { TelemetriaComponent } from './painel/telemetria/telemetria.component';
import { LocacoesComponent } from './painel/locacoes/locacoes.component';
import { AbastecimentoComponent } from './painel/abastecimento/abastecimento.component';
import { RelatorioRapidoComponent } from './painel/relatorio-rapido/relatorio-rapido.component';


export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'painel', component: PainelComponent, canActivate: [AuthGuardService], children: [
            { path: '', component: PainelComponent, canActivate: [AuthGuardService] },
            { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
            { path: 'atendimento', component: AtendimentoComponent, canActivate: [AuthGuardService] },
            { path: 'servicos', component: ServicosComponent, canActivate: [AuthGuardService] },
            { path: 'frota', component: FrotaComponent, canActivate: [AuthGuardService] },
            { path: 'custo', component: CustoComponent, canActivate: [AuthGuardService] },
            { path: 'infracoes', component: InfracoesComponent, canActivate: [AuthGuardService] },
            { path: 'locacoes', component: LocacoesComponent, canActivate: [AuthGuardService] },
            { path: 'abastecimento', component: AbastecimentoComponent, canActivate: [AuthGuardService] },
            { path: 'rapido', component: RelatorioRapidoComponent, canActivate: [AuthGuardService] },
            { path: 'telemetria', component: TelemetriaComponent, canActivate: [AuthGuardService] },
        ]
    },
];
