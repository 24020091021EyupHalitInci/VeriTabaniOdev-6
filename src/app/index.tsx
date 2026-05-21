import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {
  const [db, setDb] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Veritabanını başlat ve tabloyu kur
    async function setupDatabase() {
      const database = await SQLite.openDatabaseAsync('DailyNotes.db');
      setDb(database);
      
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS Messages (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT);
      `);
      
      fetchMessages(database);
    }
    setupDatabase();
  }, []);

  // Verileri Okuma (Read)
  const fetchMessages = async (database = db) => {
    if (!database) return;
    const allRows = await database.getAllAsync('SELECT * FROM Messages ORDER BY id DESC');
    setMessageList(allRows);
  };

  // Veri Ekleme ve Güncelleme (Create / Update)
  const handleSave = async () => {
    if (!message.trim()) {
      Alert.alert('Uyarı', 'Lütfen bir not girin.');
      return;
    }

    if (editingId) {
      await db.runAsync('UPDATE Messages SET content = ? WHERE id = ?', message, editingId);
      setEditingId(null);
    } else {
      await db.runAsync('INSERT INTO Messages (content) VALUES (?)', message);
    }
    
    setMessage('');
    fetchMessages();
  };

  // Veri Silme (Delete)
  const handleDelete = async (id) => {
    await db.runAsync('DELETE FROM Messages WHERE id = ?', id);
    fetchMessages();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setMessage(item.content);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{item.content}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editBtn}>
          <Text style={styles.btnText}>Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
          <Text style={styles.btnText}>Sil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.header}>Günün Notu</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mesajınızı buraya yazın..."
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>{editingId ? 'Güncelle' : 'Ekle'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={messageList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 60,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  saveBtn: {
    backgroundColor: '#BB86FC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  saveBtnText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardText: {
    color: '#E0E0E0',
    fontSize: 16,
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  editBtn: {
    backgroundColor: '#03DAC6',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  deleteBtn: {
    backgroundColor: '#CF6679',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  btnText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 14,
  },
});