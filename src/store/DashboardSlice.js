import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



export const fetchItems = createAsyncThunk(
  'dashboard/fetchItems',
  async (section, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    // console.log(section)
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/${section}`, {
        method: 'GET',
        headers: {
            // 'Accept': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json; charset=UTF-8',
          },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const insertItem = createAsyncThunk(
  'dashboard/insertItem',
  async (itemData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    // itemData.auther = getState().auth.name;
    const { section, formData } = itemData;
    console.log(formData.get('image'))
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/${section}`, {
        method: 'POST',
        body: formData,
        headers: {
            // 'Accept': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            // 'Content-Type': 'application/json; charset=UTF-8',
          },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const deleteItem = createAsyncThunk(
  'dashboard/deleteItem',
  async (itemData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const { section, newItem } = itemData;
    console.log(newItem)
    try {
      await fetch(`http://127.0.0.1:8000/api/${section}/${newItem.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      //const data = await res.json();
      return newItem;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);




const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState: { dashboards: [], loading: false, error: null },
  reducers: {},
  extraReducers(builder) {
    //fetch
    builder.addCase(fetchItems.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchItems.fulfilled ,(state, action) => {
      state.dashboards = action.payload;
      state.loading = false;
    })
    .addCase(fetchItems.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })

    //insert
    .addCase(insertItem.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(insertItem.fulfilled, (state, action) => {
      state.dashboards.data.unshift(action.payload);
      state.loading = false;
    })
    .addCase(insertItem.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })

    //delete
    .addCase(deleteItem.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteItem.fulfilled, (state, action) => {
      state.dashboards.data = state.dashboards.data.filter((el) => el.id !== action.payload.id);
      state.loading = false;
    })
    .addCase(deleteItem.rejected , (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
  },
});

export default DashboardSlice.reducer;







// export const fetchItems = createAsyncThunk(
//   'dashboard/fetchItems',
//   async (section, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     console.log(section)
//     try {
//       const res = await fetch(`http://localhost:3005/${section}`);
//       const data = await res.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const insertItem = createAsyncThunk(
//   'dashboard/insertItem',
//   async (itemData, thunkAPI) => {
//     const { rejectWithValue, getState } = thunkAPI;
//     // itemData.auther = getState().auth.name;
//     const { section, newItem } = itemData;
//     console.log(itemData)
//     try {
//       const res = await fetch(`http://localhost:3005/${section}`, {
//         method: 'POST',
//         body: JSON.stringify(newItem),
//         headers: {
//             // 'Accept': 'multipart/form-data',
//             'Content-Type': 'application/json; charset=UTF-8',
//           },
//       });
//       const data = await res.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteItem = createAsyncThunk(
//   'dashboard/deleteItem',
//   async (itemData, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     const { section, newItem } = itemData;
//     try {
//       await fetch(`http://localhost:3005/${section}/${newItem.id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-type': 'application/json; charset=UTF-8',
//         },
//       });
//       //const data = await res.json();
//       return newItem;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );