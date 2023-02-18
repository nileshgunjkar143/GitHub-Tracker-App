import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },
  header: {
    paddingLeft: 30,
    fontSize: 18,
    padding: 16,
    marginTop: 12,
    backgroundColor: 'white',
    marginHorizontal: 7,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    color: 'black',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },

  scrollContainer: {
    shadowColor: '#6A6C6E',
    shadowOffset: {
      width: 10,
      height: -10,
    },
    shadowOpacity: 1,
    marginHorizontal: 6,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalDots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  textAreaContainer: {
    width: '100%',
    marginBottom: 10,
  },
  textView: {
    position: 'absolute',
    fontSize: 22,
    fontFamily: 'Avenir',
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
  },
});
