import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import Header from '../../Components/Header';
import { theme } from '../../theme';

describe('Header에는 ', () => {
	const client = new QueryClient();

	it('Logo가 존재한다.', () => {
		render(
			<HashRouter>
				<RecoilRoot>
					<QueryClientProvider client={client}>
						<ThemeProvider theme={theme}>
							<Header />
						</ThemeProvider>
					</QueryClientProvider>
				</RecoilRoot>
			</HashRouter>
		);

		const logo = screen.getByLabelText('메인 페이지로 이동');

		expect(logo).toBeInTheDocument();
	});

	it('사이즈가 885이상일 때 홈, 시리즈, 프로필 선택이 존재한다.', () => {
		render(
			<HashRouter>
				<RecoilRoot>
					<QueryClientProvider client={client}>
						<ThemeProvider theme={theme}>
							<Header />
						</ThemeProvider>
					</QueryClientProvider>
				</RecoilRoot>
			</HashRouter>
		);

		const home = screen.getByRole('link', {
			name: '홈',
		});

		const series = screen.getByRole('link', {
			name: '시리즈',
		});

		const profile = screen.getByRole('link', {
			name: '프로필 선택',
		});

		expect(home).toBeInTheDocument();
		expect(series).toBeInTheDocument();
		expect(profile).toBeInTheDocument();
	});

	it('사이즈가 885미만일 때 메뉴가 존재한다.', () => {
		render(
			<HashRouter>
				<RecoilRoot>
					<QueryClientProvider client={client}>
						<ThemeProvider theme={theme}>
							<Header />
						</ThemeProvider>
					</QueryClientProvider>
				</RecoilRoot>
			</HashRouter>
		);

		const menu = screen.getByRole('button', {
			name: '메뉴',
		});

		expect(menu).toBeInTheDocument();
	});
});
