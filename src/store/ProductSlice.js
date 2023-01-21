import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (typedata, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(typedata)
    try {
      const res = await fetch(`http://localhost:3005/${typedata}`);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertProduct = createAsyncThunk(
  'product/insertProduct',
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    // bookData.auther = getState().auth.name;
    const { section, newProduct } = bookData;
    console.log(bookData)
    try {
      const res = await fetch(`http://localhost:3005/${section}`, {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
            // 'Accept': 'multipart/form-data',
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

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3005/products/${data.id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      //const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const BookSlice = createSlice({
  name: 'product',
  initialState: { products: [], loading: false, error: null },
  reducers: {},
  extraReducers(builder) {
    //fetch
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProducts.fulfilled ,(state, action) => {
      state.products = action.payload;
      state.loading = false;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })

    //insert
    .addCase(insertProduct.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(insertProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
    })
    .addCase(insertProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })

    //delete
    .addCase(deleteProduct.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter((el) => el.id !== action.payload.id);
      state.loading = false;
    })
    .addCase(deleteProduct.rejected , (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
  },
});

export default BookSlice.reducer;
