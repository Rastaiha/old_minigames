import React, { useRef } from 'react';
import { Form, Icon } from 'semantic-ui-react';
import GenderSlector from './GenderSelect';
import MySelect from './MySelect';
import PasswordAndConfirm from './PasswordAndConfirm';

const gradeOptions = [
  { key: '10', text: 'ده‌ام', value: 'ten' },
  { key: '11', text: 'یازده‌ام', value: 'eleven' },
  { key: '12', text: 'دوازده‌ام', value: 'twelve' },
];

export default function RegistrationForm({
  handleChange,
  values,
  needPass,
  needGender,
}) {
  let fileInputRef = useRef('');

  const onChangeFile = async (e) => {
    const fileInput = e.target;
    handleChange(e, { name: 'documentName', value: fileInput.value });
    e.preventDefault();
    setTimeout(() => {
      if (fileInput.files[0]) {
        if (fileInput.files[0].size <= 2097152) {
          handleChange(e, { name: 'document', value: fileInput.files[0] });
        } else {
          handleChange(e, { name: 'documentName', value: '' });
          fileInput.setCustomValidity('Maximum upload file size is 2 MB.');
          fileInput.reportValidity();
        }
      }
    }, 50);
  };
  return (
    <>
      <Form.Group unstackable>
        <Form.Input
          name="name"
          type="text"
          required
          fluid
          icon="user"
          iconPosition="left"
          placeholder="نام و نام‌خانوادگی"
          className="rtl-input rtl-placeholder"
          value={values.name}
          onChange={handleChange}
          width={16}
        />
        <MySelect
          field_props={{ fluid: true, width: 8 }}
          name="grade"
          required
          value={values.grade}
          placeholder="پایه تحصیلی"
          className="rtl-input rtl-placeholder"
          options={gradeOptions}
          onChange={(e) =>
            handleChange(e, {
              name: e.currentTarget.name,
              value: e.currentTarget.value,
            })
          }
        />
        {needGender ? (
          <GenderSlector gender={values.gender} onChange={handleChange} />
        ) : (
          ''
        )}
      </Form.Group>
      <Form.Group unstackable>
        <Form.Input
          name="city"
          type="text"
          required
          fluid
          icon="map marker alternate"
          iconPosition="left"
          placeholder="شهر"
          className="rtl-input rtl-placeholder"
          value={values.city}
          onChange={handleChange}
          width={16}
        />
        <Form.Input
          name="school"
          type="text"
          required
          fluid
          icon="university"
          iconPosition="left"
          placeholder="نام مدرسه"
          className="rtl-input rtl-placeholder"
          value={values.school}
          onChange={handleChange}
          width={16}
        />
      </Form.Group>
      <Form.Group unstackable>
        <Form.Input
          name="email"
          type="email"
          required
          fluid
          icon="mail"
          iconPosition="left"
          placeholder="ایمیل"
          className="ltr-input rtl-placeholder"
          value={values.email}
          onChange={handleChange}
          width={16}
        />
      </Form.Group>
      <Form.Group unstackable>
        <Form.Input
          name="phone"
          type="tel"
          required
          fluid
          icon="phone"
          iconPosition="left"
          dircetion="rtl"
          placeholder="شماره همراه"
          className="ltr-input rtl-placeholder"
          value={values.phone}
          onChange={handleChange}
          width={16}
        />
        <Form.Button
          type="button"
          labelPosition="left"
          icon="file"
          onClick={() => fileInputRef.click()}
          width={16}
          fluid
        >
          <span style={{ fontSize: 13 }}>
            تصویر شناسنامه/کارت‌ملی/کارنامه تحصیلی
          </span>
          <Icon name="file" />
          <input
            type="file"
            required
            style={{
              width: 1,
              height: 0,
              padding: 0,
              margin: 0,
              position: 'absolute',
              zIndex: -1,
              bottom: 0,
            }}
            value={values.documentName}
            ref={(ref) => (fileInputRef = ref)}
            onChange={onChangeFile}
          />
        </Form.Button>
      </Form.Group>
      {needPass ? (
        <PasswordAndConfirm
          handleChange={handleChange}
          password={values.password}
          password_confirmation={values.password_confirmation}
        />
      ) : (
        ''
      )}
    </>
  );
}
