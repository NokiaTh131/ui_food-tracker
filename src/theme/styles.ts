import {StyleSheet} from 'react-native';
import {theme} from './colors';

export const elderStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.elderBackground,
    padding: 20,
  },
  
  // Text styles for elder-friendly UI
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.elderTextLarge,
    textAlign: 'center',
    marginBottom: 20,
  },
  
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.elderTextLarge,
    marginBottom: 15,
  },
  
  bodyText: {
    fontSize: 20,
    color: theme.elderTextMedium,
    lineHeight: 30,
    marginBottom: 10,
  },
  
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.elderButtonText,
    textAlign: 'center',
  },
  
  // Button styles
  primaryButton: {
    backgroundColor: theme.elderButtonBackground,
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  
  secondaryButton: {
    backgroundColor: theme.background,
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.elderBorder,
  },
  
  // Card styles
  card: {
    backgroundColor: theme.elderCardBackground,
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    shadowColor: theme.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: theme.elderBorder,
  },
  
  // Input styles
  input: {
    backgroundColor: theme.background,
    borderWidth: 2,
    borderColor: theme.elderBorder,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 20,
    color: theme.elderTextLarge,
    marginVertical: 10,
    minHeight: 55,
  },
  
  // Icon styles
  iconLarge: {
    fontSize: 36,
    color: theme.primary,
    marginBottom: 10,
  },
  
  iconMedium: {
    fontSize: 28,
    color: theme.primary,
  },
  
  // Layout styles
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  // Spacing
  marginBottom: {
    marginBottom: 20,
  },
  
  marginTop: {
    marginTop: 20,
  },
  
  padding: {
    padding: 20,
  },
  
  // Elder-specific styles
  elderSafeArea: {
    flex: 1,
    backgroundColor: theme.elderBackground,
  },
  
  elderScrollView: {
    backgroundColor: theme.elderBackground,
    paddingHorizontal: 20,
  },
  
  elderHighlight: {
    backgroundColor: theme.elderHighlight,
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
  },
});