import { useState } from 'react';
import StatusBar from './components/StatusBar';
import BottomNav from './components/BottomNav';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import CommunitiesScreen from './screens/CommunitiesScreen';
import CreateParcheScreen from './screens/CreateParcheScreen';
import JoinParcheScreen from './screens/JoinParcheScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import StoriesScreen from './screens/StoriesScreen';
import ProfileScreen from './screens/ProfileScreen';
import BusinessScreen from './screens/BusinessScreen';
import SafetyScreen from './screens/SafetyScreen';
import { IconBack } from './components/Icon';

export type ScreenName =
  | 'welcome'
  | 'map'
  | 'communities'
  | 'create'
  | 'join'
  | 'feedback'
  | 'stories'
  | 'profile'
  | 'business'
  | 'safety';

const titlesForBack: Record<Exclude<ScreenName, 'welcome' | 'map' | 'communities' | 'create' | 'join' | 'profile'>, string> = {
  feedback: '¿Cómo te fue?',
  stories: 'Historias',
  business: 'Para organizadores',
  safety: 'Confianza y seguridad'
};

// Screens where the in-screen scroll handles its own layout (full bleed)
const FULL_BLEED: ScreenName[] = ['welcome', 'map'];

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('welcome');

  const showBottomNav = screen !== 'welcome';
  const showBackBar = screen in titlesForBack;
  const isFullBleed = FULL_BLEED.includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen onNavigate={setScreen} />;
      case 'map':
        return <MapScreen onNavigate={setScreen} />;
      case 'communities':
        return <CommunitiesScreen />;
      case 'create':
        return <CreateParcheScreen onNavigate={setScreen} />;
      case 'join':
        return <JoinParcheScreen onNavigate={setScreen} />;
      case 'feedback':
        return <FeedbackScreen onNavigate={setScreen} />;
      case 'stories':
        return <StoriesScreen />;
      case 'profile':
        return <ProfileScreen onNavigate={setScreen} />;
      case 'business':
        return <BusinessScreen />;
      case 'safety':
        return <SafetyScreen />;
    }
  };

  return (
    <div className="app-shell">
      <div className="phone">
        <div className="phone-notch" />

        <div className="phone-screen">
          <StatusBar />

          {showBackBar && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '6px 20px 4px',
                position: 'relative',
                zIndex: 10
              }}
            >
              <button
                className="tool-btn"
                style={{ width: 36, height: 36 }}
                onClick={() => setScreen('map')}
                aria-label="Volver"
              >
                <IconBack size={18} />
              </button>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--text-soft)'
                }}
              >
                {titlesForBack[screen as keyof typeof titlesForBack]}
              </span>
            </div>
          )}

          {isFullBleed ? (
            <div style={{ flex: 1, position: 'relative', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              {renderScreen()}
            </div>
          ) : (
            <div className="screen-content" key={screen}>
              {renderScreen()}
            </div>
          )}

          {showBottomNav && <BottomNav active={screen} onNavigate={setScreen} />}
        </div>
      </div>
    </div>
  );
}
