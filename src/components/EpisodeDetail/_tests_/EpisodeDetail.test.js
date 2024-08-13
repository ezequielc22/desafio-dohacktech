import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import EpisodeDetail from '../index'; // Asegúrate de que la ruta sea correcta

jest.useFakeTimers();
const episode = {
  air_date: "December 2, 2013",
  characters: [
    "https://rickandmortyapi.com/api/character/1",
    "https://rickandmortyapi.com/api/character/2",
  ],
  created: "2017-11-10T12:56:33.798Z",
  episode: "S01E01",
  id: 1,
  name: "Pilot",
  url: "https://rickandmortyapi.com/api/episode/1"
};

const characters = [
  {
    created: "2017-11-04T18:48:46.250Z",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
    ],
    gender: "Male",
    id: 1,
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    name: "Rick Sanchez",
    species: "Human",
    status: "Alive",
    url: "https://rickandmortyapi.com/api/character/1"
  },
  {
    created: "2017-11-04T18:50:21.651Z",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
    ],
    gender: "Male",
    id: 2,
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    name: "Morty Smith",
    species: "Human",
    status: "Alive",
    url: "https://rickandmortyapi.com/api/character/2"
  },
];

describe('EpisodeDetail', () => {
  it('renders correctly with episode and characters data', async () => {
    const { getByText, getByRole } = render(
      <EpisodeDetail episode={episode} characters={characters} />
    );
    await waitFor(()=>{
        jest.advanceTimersByTime(5000);
        expect(getByText('S01E01: Pilot')).toBeTruthy();
        expect(getByText('Air Date: December 2, 2013')).toBeTruthy();
    })
     const character = getByText('Rick Sanchez');
     expect(character).toBeTruthy();
  });

  it('renders without crashing when episode is null', () => {
    const { queryByTestId } = render(
        <EpisodeDetail episode={null} characters={characters} />
      );
    expect(queryByTestId('container')).toBeNull();
  });
  it('renders the episode title correctly', async () => {
    const { getByTestId } = render(<EpisodeDetail episode={episode} characters={characters} />);
    const titleElement = getByTestId('title');
    await waitFor(()=>{
        jest.advanceTimersByTime(5000);
        expect(titleElement.props.children).toBe(`${episode.episode}: ${episode.name}`);
    })
  });

  it('renders the air date correctly', async () => {
    const { getByTestId } = render(<EpisodeDetail episode={episode} characters={characters} />);
    const subtitleElement = getByTestId('subtitle');
    await waitFor(()=>{
        jest.advanceTimersByTime(5000);
        expect(subtitleElement.props.children).toBe(`Air Date: ${episode.air_date}`);
    })
  });
});
