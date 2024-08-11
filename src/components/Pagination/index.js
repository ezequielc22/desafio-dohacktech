import React from 'react';
import { Animated, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const Pagination = ({
  page,
  totalPages,
  handlePageChange,
  handlePageEdit,
  inputPage,
  handleInputChange,
  goToPage,
  editingPage,
  errorState,
  errorStateVisible,
  shakeAnimation,
}) => {
  const renderPagination = () => {
    const range = 3; // Number of visible pages
    let startPage = Math.max(1, page - Math.floor(range / 2));
    let endPage = Math.min(totalPages, page + Math.floor(range / 2));

    if (endPage - startPage + 1 < range && endPage < totalPages) {
      startPage = Math.max(1, endPage - range + 1);
    }

    return (
      <Animated.View style={[styles.paginationContainer, { transform: [{ translateX: shakeAnimation }] }]}>
        {page > 1 && (
          <TouchableOpacity onPress={() => handlePageChange(page - 1)} style={styles.pageButton}>
            <Text style={styles.pageButtonText}>{'<'}</Text>
          </TouchableOpacity>
        )}
        {startPage > 1 && (
          <>
            <TouchableOpacity onPress={() => handlePageChange(1)} style={styles.pageButton}>
              <Text style={styles.pageButtonText}>1</Text>
            </TouchableOpacity>
            {startPage > 2 && <Text style={styles.pageButtonText}>...</Text>}
          </>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(p => (
          <View key={p} style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() => handlePageEdit(p)}
              style={[
                styles.pageButton,
                errorState && errorStateVisible && editingPage === p && styles.errorButton,
              ]}
            >
              {editingPage === p ? (
                <TextInput
                  keyboardType="numeric"
                  value={inputPage}
                  onChangeText={handleInputChange}
                  onSubmitEditing={goToPage}
                  autoFocus
                />
              ) : (
                <Text style={styles.pageButtonText}>{p}</Text>
              )}
            </TouchableOpacity>
          </View>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <Text style={styles.pageButtonText}>...</Text>}
            <TouchableOpacity onPress={() => handlePageChange(totalPages)} style={styles.pageButton}>
              <Text style={styles.pageButtonText}>{totalPages}</Text>
            </TouchableOpacity>
          </>
        )}
        {page < totalPages && (
          <TouchableOpacity onPress={() => handlePageChange(page + 1)} style={styles.pageButton}>
            <Text style={styles.pageButtonText}>{'>'}</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    );
  };

  return renderPagination();
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonWrapper: {
    position: 'relative',
  },
  pageButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    transition: 'all 500ms ease-in-out', // Added transition for size change
  },
  errorButton: {
    borderColor: 'red',
    borderWidth: 1, // Border width should be the same as default
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  pageButtonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Pagination;
