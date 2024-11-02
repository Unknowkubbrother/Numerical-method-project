import React from 'react';
import { test } from 'vitest'
import { expect } from 'vitest'
import { render } from '@testing-library/react'
import Home from '../src/components/Home/Home'
import { MemoryRouter } from 'react-router-dom';

test('Home', async () => {
  const { getByText } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
)

  expect(getByText('Numerical')).toBeInTheDocument();
})
