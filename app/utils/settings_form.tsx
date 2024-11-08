

export type SettingsFormType = {
    'input@company_name': string;
    'input@company_phone': string;
    'input@company_description': string;
    'textarea@office_address': string;
  };


export const SettingsForm:SettingsFormType  = {
    'input@company_name':'company fullname',
    'input@company_phone':'+234904545454545',
    'input@company_description':'our default description',
    'textarea@office_address':'office address',
}