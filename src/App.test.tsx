import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import { fetchApplicantData } from './store/applicantSlice';

// Mock axios
jest.mock('axios');
import axios from 'axios';
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByText(/My Awesome Application/i)).toBeInTheDocument();
  });

  it('fetches and displays data when the image is clicked', async () => {
    // Mock the API response
    const applicantData = {
      name: 'Daniel',
      fun_fact: 'I love hiking on weekends!',
    };
    mockedAxios.get.mockResolvedValueOnce({ data: applicantData });

    const { getByAltText, findByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const image = getByAltText(/Click to know about me/i);
    fireEvent.click(image);

    // Verify that the data is displayed
    const name = await findByText(applicantData.name);
    const funFact = await findByText(`Fun Fact: ${applicantData.fun_fact}`);

    expect(name).toBeInTheDocument();
    expect(funFact).toBeInTheDocument();
  });
});
