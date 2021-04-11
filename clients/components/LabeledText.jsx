/**
 * ************************************
 *
 * @module  LabeledText
 * @author
 * @date
 * @description Simple presentation component that shows a bold label next to plain text
 *
 * ************************************
 */

import React from 'react';

const LabeledText = ({ label, text }) => (
  <div>
    <strong>{`${label}: `}</strong>
    {text}
  </div>
);

export default LabeledText;
