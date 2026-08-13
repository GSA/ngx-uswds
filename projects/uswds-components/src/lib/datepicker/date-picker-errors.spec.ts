import { createMissingDateImplError } from './date-picker-errors';

describe('createMissingDateImplError', () => {
  it('returns an Error instance', () => {
    expect(createMissingDateImplError('DateAdapter')).toBeInstanceOf(Error);
  });

  it('message contains the provider name', () => {
    const err = createMissingDateImplError('MyProvider');
    expect(err.message).toContain('MyProvider');
  });

  it('message mentions UsaDatePicker', () => {
    const err = createMissingDateImplError('DateAdapter');
    expect(err.message).toContain('UsaDatePicker');
  });
});
