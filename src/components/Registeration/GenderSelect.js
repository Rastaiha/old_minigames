import React from 'react';

export default function GenderSlector(props) {
  return (
    <div className="gender-icons">
      <div>
        <div
          onClick={(e) => {
            document.getElementById('gholi-input').setCustomValidity('');
            document.getElementById('gholi-input').required = false;
            props.onChange(e, { name: 'gender', value: 'Man' });
          }}
          className={
            props.gender === 'Man' ? 'gender-icon selected' : 'gender-icon'
          }
        >
          <img src={process.env.PUBLIC_URL + '/boy.png'} alt="Man" />
        </div>
        {props.withLabel ? (
          <span style={{ margin: '0 10px' }}>پسرونه</span>
        ) : (
          ''
        )}
      </div>
      <div style={{ position: 'relative' }}>
        <input
          name="gholi"
          id="gholi-input"
          type="checkbox"
          required
          style={{
            width: 1,
            hegith: 0,
            padding: 0,
            margin: 0,
            border: 0,
            position: 'absolute',
            zIndex: -1,
            bottom: 0,
          }}
          onInvalid={() =>
            document
              .getElementById('gholi-input')
              .setCustomValidity('Select item!')
          }
          onChange={() =>
            document.getElementById('gholi-input').setCustomValidity('')
          }
        />
      </div>
      <div>
        <div
          onClick={(e) => {
            document.getElementById('gholi-input').setCustomValidity('');
            document.getElementById('gholi-input').required = false;
            props.onChange(e, { name: 'gender', value: 'Woman' });
          }}
          className={
            props.gender === 'Woman' ? 'gender-icon selected' : 'gender-icon'
          }
        >
          <img src={process.env.PUBLIC_URL + '/girl.png'} alt="Woman" />
        </div>
        {props.withLabel ? (
          <span style={{ margin: '0 10px' }}>دخترونه</span>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
