import { CandidateServiceModule } from './candidate-service.module';

describe('CandidateServiceModule', () => {
  let candidateServiceModule: CandidateServiceModule;

  beforeEach(() => {
    candidateServiceModule = new CandidateServiceModule();
  });

  it('should create an instance', () => {
    expect(candidateServiceModule).toBeTruthy();
  });
});
