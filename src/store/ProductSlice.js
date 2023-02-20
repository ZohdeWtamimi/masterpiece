import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (section, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    // console.log(section)
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/public/products`+section);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertProduct = createAsyncThunk(
  'product/insertProduct',
  async (itemData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    // itemData.auther = getState().auth.name;
    console.log(itemData)
    const { section, formData } = itemData;
    console.log(formData.get('minPrice'))
    try {
      // const res = await fetch(`http://127.0.0.1:8000/api/${section}`, {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //       // 'Accept': 'multipart/form-data',
      //       'Content-Type': 'application/json; charset=UTF-8',
      //     },
      // });
      // const data = await res.json();
      const data = await axios.post(`http://127.0.0.1:8000/api/${section}`, formData)
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// old one
// export const insertProduct = createAsyncThunk(
//   'product/insertProduct',
//   async (itemData, thunkAPI) => {
//     const { rejectWithValue, getState } = thunkAPI;
//     // itemData.auther = getState().auth.name;
//     const { section, formData } = itemData;
//     // console.log(formData.get('image'))
//     try {
//       const res = await fetch(`http://127.0.0.1:8000/api/${section}`, {
//         method: 'POST',
//         body: formData,
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

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (itemData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const { section, newItem } = itemData;
    console.log(newItem)
    try {
      await fetch(`http://127.0.0.1:8000/api/${section}/${newItem.id}`, {
        method: 'DELETE',
        headers: {
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

const ProductSlice = createSlice({
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

    // filter
    // .addCase(filterProducts.pending, (state, action) => {
    //   state.error = null;
    //   state.loading = true;
    // })
    // .addCase(filterProducts.fulfilled ,(state, action) => {
    //   state.products = action.payload;
    //   state.loading = false;
    // })
    // .addCase(filterProducts.rejected, (state, action) => {
    //   state.error = action.payload;
    //   state.loading = false;
    // })

    //insert
    .addCase(insertProduct.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(insertProduct.fulfilled, (state, action) => {
      console.log(action.payload)
      if(action.payload.data){
        state.products = action.payload 
      }else{
        state.products.data.push(action.payload);
      }
      state.loading = false;
      // state.products.data.push(action.payload);
      // state.loading = false;
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
      state.products.data = state.products.data.filter((el) => el.id !== action.payload.id);
      state.loading = false;
    })
    .addCase(deleteProduct.rejected , (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
  },
});

export default ProductSlice.reducer;
