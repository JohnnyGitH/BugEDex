import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { ConfigService } from './config.service';


describe('ConfigService', () => {
  let service: ConfigService;
  let spectator: SpectatorHttp<ConfigService>;

  const createService = createHttpFactory({
    service: ConfigService,
    imports: [
      LoggerTestingModule],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
