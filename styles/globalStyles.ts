import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

const { width } = Dimensions.get('window');

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  section: 40,
};

export const BorderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};

export const Typography = {
  titleLarge: {
    fontSize: Math.min(32, width * 0.08),
    fontWeight: 'bold' as const,
    color: Colors.light.text,
  },
  titleMedium: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: Colors.light.text,
  },
  titleSmall: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.light.text,
  },
  bodyLarge: {
    fontSize: 16,
    color: Colors.light.text,
  },
  bodyMedium: {
    fontSize: 14,
    color: Colors.light.icon,
  },
  bodySmall: {
    fontSize: 13,
    color: Colors.light.icon,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#2ecc71',
  },
  mutedText: {
    fontSize: 14,
    color: '#999',
  },
  dangerText: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: '600' as const,
  },
  whiteText: {
    color: '#fff',
  },
  subtitle: {
    fontSize: Math.min(16, width * 0.04),
    color: Colors.light.icon,
  },
};

export const globalStyles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  safeAreaGray: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  containerGray: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  contentPadding: {
    paddingHorizontal: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.light.background,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pageHeader: {
    marginTop: Platform.OS === 'ios' ? 8 : 16,
    marginBottom: Spacing.lg,
  },

  headerTitle: {
    fontSize: Math.min(32, width * 0.08),
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  subTitle: {
    fontSize: Math.min(16, width * 0.04),
    color: Colors.light.icon,
  },


  emptyContainer: {
    padding: Spacing.section,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginTop: Spacing.lg,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  errorContainer: {
    padding: Spacing.section,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.background,
    margin: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: Spacing.md,
  },

  card: {
    backgroundColor: Colors.light.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  cardRow: {
    backgroundColor: Colors.light.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  categoryCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.light.background,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
    }),
  },
  cardImageFull: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  cardOverlayText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },

  primaryButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: BorderRadius.lg,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  iconButton: {
    padding: Spacing.xs,
  },

  priceText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#2ecc71',
  },
  dangerText: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: '600' as const,
  },
  mutedText: {
    fontSize: 14,
    color: '#999',
  },


  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: Colors.light.tint,
    width: 28,
    height: 28,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonLarge: {
    backgroundColor: Colors.light.tint,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    margin: 2,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: Spacing.md,
    color: Colors.light.text,
  },
  quantityTextLarge: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: Spacing.lg,
    color: Colors.light.text,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    height: 56,
  },
  inputIcon: {
    marginRight: Spacing.md,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
    height: '100%',
  },

  listFooter: {
    backgroundColor: Colors.light.background,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.icon,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
  },

  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: Spacing.lg,
  },
  menuValue: {
    fontSize: 14,
    color: '#999',
    marginRight: Spacing.sm,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.background,
    marginTop: Spacing.lg,
    padding: Spacing.lg,
  },
  logoutText: {
    fontSize: 16,
    color: '#e74c3c',
    marginLeft: Spacing.sm,
    fontWeight: '500',
  },

  toastContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#333',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: Spacing.xs,
  },
});
