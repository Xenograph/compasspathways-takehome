import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Paginator from '../components/Paginator';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation');

describe('Paginator', () => {
  it('displays the current page number', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => '7',
      entries: () => [['page', '7']]
    });
    render(<Paginator more={false} paramName="page" />);
    const currentPage = screen.getByRole('link', { current: 'page' });
    expect(currentPage).toBeInTheDocument();
    expect(currentPage).toHaveTextContent('7');
  });

  it('displays the current-1 page number', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => '7',
      entries: () => [['page', '7']]
    });
    render(<Paginator more={false} paramName="page" />);
    const prevPage = screen.getByText('6', { selector: 'li > a' });
    expect(prevPage).toBeInTheDocument();
  });

  it('displays the current+1 page number if not on last page', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => '7',
      entries: () => [['page', '7']]
    });
    render(<Paginator more={true} paramName="page" />);
    const nextPage = screen.getByText('8', { selector: 'li > a' });
    expect(nextPage).toBeInTheDocument();
  });

  it('does not display current+1 page number when on last page', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => '7',
      entries: () => [['page', '7']]
    });
    render(<Paginator more={false} paramName="page" />);
    const nextPage = screen.queryByText('8');
    expect(nextPage).not.toBeInTheDocument();
  });

  it('always displays the first page', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => '7',
      entries: () => [['page', '7']]
    });
    render(<Paginator more={false} paramName="page" />);
    const firstPage = screen.getByText('1', { selector: 'li > a' });
    expect(firstPage).toBeInTheDocument();
  });

  it('does not display previous page button when on first page', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => '1',
      entries: () => [['page', '1']]
    });
    render(<Paginator more={false} paramName="page" />);
    const previousPage = screen.queryByText('Previous');
    expect(previousPage).not.toBeInTheDocument();
  });

  it('displays previous page button when not on first page', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => '2',
      entries: () => [['page', '2']]
    });
    render(<Paginator more={false} paramName="page" />);
    const previousPage = screen.getByText('Previous');
    expect(previousPage).toBeInTheDocument();
  });

  it('displays next page button when not on last page', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => '2',
      entries: () => [['page', '2']]
    });
    render(<Paginator more={true} paramName="page" />);
    const previousPage = screen.getByText('Next');
    expect(previousPage).toBeInTheDocument();
  });

  it('does not display next page button when on last page', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => '1',
      entries: () => [['page', '1']]
    });
    render(<Paginator more={false} paramName="page" />);
    const nextPage = screen.queryByText('Next');
    expect(nextPage).not.toBeInTheDocument();
  });
});
