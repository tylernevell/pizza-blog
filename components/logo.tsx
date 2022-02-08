import React from 'react';
import Link from 'next/link';
import { Text } from 'evergreen-ui';

const Logo = ({ ...styles }) => {
  return (
    <Link href="/">
      <a>
        <Text fontSize="30px" color="#db524e" {...styles}>
          <strong>The Dough</strong>
        </Text>
      </a>
    </Link>
  );
};

export default Logo;
