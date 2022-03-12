import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from './styles';

function Profile() {
	return (
		<Wrapper>
			<div className="profiles">
				<h1 className="profiles-header">
					넷플릭스를 시청할 프로필을 선택하세요.
				</h1>
				<ul className="profiles-list">
					<li className="profiles-item">
						<Link to="/">
							<div className="profile">
								<div className="profile-img red" />
								<h3 className="profile-name">사용자1의 프로필</h3>
							</div>
						</Link>
					</li>
					<li className="profiles-item">
						<Link to="/">
							<div className="profile">
								<div className="profile-img green" />
								<h3 className="profile-name">사용자2</h3>
							</div>
						</Link>
					</li>
					<li className="profiles-item">
						<Link to="/">
							<div className="profile">
								<div className="profile-img blue" />
								<h3 className="profile-name">사용자3</h3>
							</div>
						</Link>
					</li>
				</ul>
				<div className="profiles-manager">
					<Link to="/">
						<span>프로필 관리</span>
					</Link>
				</div>
			</div>
		</Wrapper>
	);
}

export default Profile;
